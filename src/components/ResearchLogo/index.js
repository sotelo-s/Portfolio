import {useColorMode} from '@docusaurus/theme-common';

function ResearchLogo() {
  const {colorMode} = useColorMode();

  const logo = colorMode === 'dark'
    ? 'https://citius.gal/files/identity/negativo_vertical_logo_tagline_citius.png'
    : 'https://citius.gal/files/identity/positivo_vertical_logo_tagline_citius.png';

  return (
    <img
      src={logo}
      alt="Research centre logo"
      width="100%"
    />
  );
}
export default ResearchLogo;