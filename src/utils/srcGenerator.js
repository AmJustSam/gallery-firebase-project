import ImgixClient from 'imgix-core-js';

const client = new ImgixClient({
  domain: "ajs.imgix.net",
  secureURLToken: '[your_api_key_here]',
}); 

const genLowSrcset = (filename) => (
    client.buildSrcSet(`${filename}`, 
    {q: 60, fit: "crop", auto: "format"},
    {widths: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]})
)

const genSrcset = (filename) => (
  client.buildSrcSet(`${filename}`, 
  {q: 80, fit: "crop", auto: "format"},
  {widths: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]})
)

const genLowUrl = (filename) => (
  client.buildURL(`${filename}`, 
  {q: 100, w: 50, blur: 30, fit: "crop", auto: "format"})
);

const genUrl = (filename) => (
  client.buildURL(`${filename}`, 
  {q: 80, w: 1000, fit: "crop", auto: "format"})
);

const genDownloadUrl = (filename) => (
  client.buildURL(`${filename}`,
  {dl: ""}
));


export {
  genLowSrcset,
  genSrcset,
  genLowUrl,
  genUrl,
  genDownloadUrl
};
