
import React from "react";

import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <div>
      <Grid container className="footer">
        <Grid className="footer__container" item xs={12} >
        <div>
            {/* © Copyright <b>Thành đoàn thành phố Hồ Chí Minh</b>. All Rights Reserved */}
          CỔNG THÔNG TIN "Vì Đàn Em Thành Phố Hồ Chí Minh"
          </div>
          <div>
            Đơn vị quản lí Ban Thiếu Nhi, Thành Đoàn Thành Phố Hồ Chí Minh
          </div>
        </Grid>
      </Grid>
    </div>
  );
}


