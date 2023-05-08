
import React from "react";

import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <div>
      <Grid container className="footer">
        <Grid className="footer__container" item xs={12} >
        <div>
            © Copyright <b>Thành đoàn thành phố Hồ Chí Minh</b>. All Rights Reserved
          </div>
          <div>
            Designed by <b>Thành đoàn thành phố Hồ Chí Minh</b>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}


