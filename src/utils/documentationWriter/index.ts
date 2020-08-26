import fontkit from '@pdf-lib/fontkit';
import { decode } from 'base64-arraybuffer';
import { PDFDocument, PDFFont, PDFPage } from 'pdf-lib';

import { AppConfig, IdentityProvider, Providers } from '~/types';

// NB: rollup plugins not playing well with each other,
// so no root aliasing
import SFMono from '../../resources/SFMono-Regular.ttf';

export const PDF_VERSION = 1;

type Coordinates = {
  x: number;
  y: number;
  font?: PDFFont;
  size?: number;
};

const providerCoordinates = {
  [Providers.Azure]: {
    domain: { x: 55, y: 2799 },
    acsUrl: { x: 55, y: 2851 },
    name: { x: 395, y: 933 },
    // logoUrl: { x: 55, y: 2000 },
  },
  [Providers.Okta]: {
    domain: { x: 55, y: 2094 },
    acsUrl: { x: 55, y: 1936 },
    name: { x: 215, y: 1543 },
    logoUrl: { x: 320, y: 1578 },
  },
};

const generateDocumentation = async (
  template: ArrayBuffer,
  identityProvider: IdentityProvider,
  appConfig: AppConfig,
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(template);

  pdfDoc.registerFontkit(fontkit);
  const fontBytes = decode(SFMono);
  const font = await pdfDoc.embedFont(fontBytes);
  const firstPage = pdfDoc.getPages()[0];

  Object.entries(providerCoordinates[identityProvider.service]).forEach(([key, coordinates]) => {
    const text = identityProvider[key as keyof IdentityProvider] || appConfig[key as keyof AppConfig];

    text && writeField(firstPage, text, { ...coordinates, font });
  });

  return pdfDoc.save();
};

const writeField = (page: PDFPage, text: string, coordinates: Coordinates) => {
  const { height } = page.getSize();
  const { y, ...rest } = coordinates;

  page.drawText(text, {
    size: 10,
    ...rest,
    y: height - y,
  });
};

export default generateDocumentation;
