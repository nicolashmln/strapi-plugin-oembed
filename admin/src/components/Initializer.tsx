import { useEffect, useRef } from 'react';

import pkgJson from '../../../package.json';

type InitializerProps = {
  setPlugin: (id: string) => void;
};

const Initializer = ({ setPlugin }: InitializerProps) => {
  const ref = useRef(setPlugin);

  useEffect(() => {
    ref.current(pkgJson.strapi.name);
  }, []);

  return null;
};

export { Initializer };
