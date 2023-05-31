import 'next/styles/globals.css' //This is so that all of my pages have access to the global css file.
//The _app.js file is speial because it is the top level component which means that it is the parent component of all of the other components.
//This is already configured and not required for me to manually put <App> for every page

 
function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}
 
export default MyApp;
