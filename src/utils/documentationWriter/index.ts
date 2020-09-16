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
    contactEmail: { x: 45, y: 388 },
    name: { x: 395, y: 962 },
    domain: { x: 55, y: 2828 },
    acsUrl: { x: 55, y: 2880, size: 8 },
    // logoUrl: { x: 55, y: 2000 },
  },
  [Providers.Okta]: {
    contactEmail: { x: 45, y: 388 },
    name: { x: 215, y: 1615 },
    logoUrl: { x: 81, y: 1684 },
    acsUrl: { x: 55, y: 2009, size: 8 },
    domain: { x: 55, y: 2167 },
  },
  // TODO: map coordinates for below
  [Providers.OneLogin]: {
    contactEmail: { x: 45, y: 388 },
    name: { x: 215, y: 1615 },
    logoUrl: { x: 81, y: 1684 },
    acsUrl: { x: 55, y: 2009, size: 8 },
    domain: { x: 55, y: 2167 },
  },
  [Providers.Google]: {
    contactEmail: { x: 45, y: 388 },
    name: { x: 215, y: 1615 },
    logoUrl: { x: 81, y: 1684 },
    acsUrl: { x: 55, y: 2009, size: 8 },
    domain: { x: 55, y: 2167 },
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
