import WertWidget from '@wert-io/widget-initializer';
import { WERT_IO_PARTNER_ID } from 'utils/constants';

function getWertWidget(address?: string): WertWidget {
  return new WertWidget({ partner_id: WERT_IO_PARTNER_ID, commodity: 'ETH', address, theme: 'dark' });
}
export default getWertWidget;
