import fontkit from '@pdf-lib/fontkit';
import { decode } from 'base64-arraybuffer';
import { PDFDocument, PDFFont, PDFPage } from 'pdf-lib';

import useOssoFields from '~/hooks/useOssoFields';
import { AppConfig, IdentityProvider } from '~/types';

// NB: rollup plugins not playing well with each other,
// so no root aliasing
import SFMono from '../../resources/SFMono-Regular.ttf';

type Coordinates = {
  x: number;
  y: number;
  font?: PDFFont;
  size?: number;
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

  const { fieldsForProvider } = useOssoFields();
  const providerFields = fieldsForProvider(identityProvider.service);
  const configurationFields = providerFields.ossoGeneratedFields.manual;
  configurationFields.map((field) => {
    const text = identityProvider[field.name as keyof IdentityProvider];

    text && writeField(firstPage, text, { ...field.pdfProps, font });
  });

  const appFields = providerFields.ossoGeneratedFields.appDetails;
  appFields.map((field) => {
    const text = appConfig[field.name as keyof AppConfig];
    text && writeField(firstPage, text, { ...field.pdfProps, font });
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
