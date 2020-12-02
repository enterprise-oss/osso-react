import { BasicQueryStringUtils, LocationLike, StringMap } from '@openid/appauth';

export class NoHashQueryStringUtils extends BasicQueryStringUtils {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parse(input: LocationLike, useHash: boolean): StringMap {
    return super.parse(input, false /* never use hash */);
  }
}
