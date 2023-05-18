import { ThemeConfig } from 'antd';

const primary = '#589aaf';
const primaryDark = '#257994';
const lightGray = '#f8f8f8';
const white = '#ffffff';
const black = '#313131';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: primary,
    colorBgBase: lightGray,
    colorBgContainer: white,
    colorIcon: lightGray,
    colorIconHover: primaryDark,
    colorLink: black,
    colorLinkHover: primaryDark,
  },
  components: {
    Layout: {
      colorBgHeader: primary,
      colorBgTrigger: primary,
    },
  },
};

// 242d40 black
