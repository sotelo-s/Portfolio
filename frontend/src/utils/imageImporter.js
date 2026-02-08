//gateway
import gatewayMain from '../assets/projects/gateway.png';

import gatewayArchitecture from '../assets/projects/gallery/gateway-architecture-es.png';
import gatewayContextDiagram from '../assets/projects/gallery/gateway-context-diagram-es.png';
import gatewayTechnologies from '../assets/projects/gallery/gateway-technologies-es.png';
import gatewayUI from '../assets/projects/gallery/gateway-ui-es.png';

import gatewayArchitectureEn from '../assets/projects/gallery/gateway-architecture-en.png';
import gatewayContextDiagramEn from '../assets/projects/gallery/gateway-context-diagram-en.png';
import gatewayTechnologiesEn from '../assets/projects/gallery/gateway-technologies-en.png';
import gatewayUIEn from '../assets/projects/gallery/gateway-ui-en.png';

//portfolio
import portfolioMain from '../assets/projects/portfolio.png';


const imageMap = {
  //gateway
  'gateway.png' : gatewayMain,

  'gateway-architecture-es.png': gatewayArchitecture,
  'gateway-context-diagram-es.png': gatewayContextDiagram,
  'gateway-technologies-es.png': gatewayTechnologies,
  'gateway-ui-es.png': gatewayUI,

  'gateway-architecture-en.png': gatewayArchitectureEn,
  'gateway-context-diagram-en.png': gatewayContextDiagramEn,
  'gateway-technologies-en.png': gatewayTechnologiesEn,
  'gateway-ui-en.png': gatewayUIEn,

  //portfolio
  'portfolio.png' : portfolioMain
};

/**
 *get project image by filename
 */
export const getProjectImage = (imageName) => {
  if (!imageName) return null;
  
  if (imageName.startsWith('http://') || 
      imageName.startsWith('https://') || 
      imageName.startsWith('data:')) {
    return imageName;
  }
  
  const cleanName = imageName.split('/').pop();
  
  const image = imageMap[cleanName];
  
  if (!image) {
    console.warn(`Image "${cleanName}" not found in imageImporter. Available images:`, Object.keys(imageMap));
    return null;
  }
  
  return image;
};


export default imageMap;