
import { Link, Typography } from '@mui/material';


type Options = {
  title: string,
  message: string,
  callbackBtnText: string
  callbackAction: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export function SucessScreen(options: Options) {
  return (
    <div style={{
      padding: '10px 20px',
    }}
    >
      <Typography>
        {options.title}
        <br />
        {options.message}
      </Typography>
      <Link
        onClick={options.callbackAction}
        style={{
          textAlign: 'center',
          width: '100%',
          display: 'block',
        }}
      >
        {options.callbackBtnText}
      </Link>
    </div>
  );
}
