const sanityClient = require('@sanity/client');
const fs = require('fs');

const client = sanityClient.createClient({
    projectId: 'm545lzrr',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-10-24',
});

const getSiteData = async () => {
    const query = `
        *[_type == "siteSettings"][0] {
            ...
        }
    `;

    try {
        const data = await client.fetch(query);
        const path = 'json';
        const file = 'siteSettings.json';
        const jsonData = JSON.stringify(data);

        fs.writeFile(`${path}/${file}`, jsonData, 'utf8', () => {
            console.log(`Wrote ${file} file.`);
        });

        return data;
    } catch (error) {
        console.error('Error fetching site data:', error);
        return [];
    }
};

const getProjectData = async () => {
    const query = `
        *[_type == 'project'] | order(orderRank) [0...100] {
            title,
            slug,
            defaultThumbnail {
                media {
                    ...,
                    mediaType,
                    image {
                        asset-> {
                            url,
                            metadata {
                                lqip
                            }
                        },
                        alt
                    },
                    video {
                        asset-> {
                            playbackId,
                        },
                    },
                }
            }
        }
    `;

    try {
        const data = await client.fetch(query);
        const path = 'json';
        const file = 'projectData.json';
        const jsonData = JSON.stringify(data);

        fs.writeFile(`${path}/${file}`, jsonData, 'utf8', () => {
            console.log(`Wrote ${file} file.`);
        });

        return data;
    } catch (error) {
        console.error('Error fetching site data:', error);
        return [];
    }
};

module.exports = {
    getSiteData,
    getProjectData,
};
