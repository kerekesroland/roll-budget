import React from 'react';

import MobileNavbar from '@/components/MobileNavbar';

type Props = {};

const Reminders = (props: Props) => {
  return (
    <>
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <h2>Reminders</h2>
    </>
  );
};

export default Reminders;
