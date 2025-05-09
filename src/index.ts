/**
 * ExcaliForSofa - Main entry point
 * 
 * This is the main entry point for the ExcaliForSofa application.
 * It extends Excalidraw with specialized features for sofa measurement
 * and production template generation.
 */

import { AppProps } from 'src/types/app';

// This function will initialize our ExcaliForSofa app
// extending the base Excalidraw functionality
const initExcaliForSofa = (props: AppProps) => {
  console.log('Initializing ExcaliForSofa application', props);
  // TODO: Initialize the application with specialized features
  return {
    // Return initialized app instance
  };
};

// Export our main functions and types
export { initExcaliForSofa };

// Default export for direct importing
export default initExcaliForSofa; 