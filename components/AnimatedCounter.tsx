'use client';

import CountUp from "react-countup";

function AnimatedCounter({ amount }: { amount : number }) {
  return (
    <div className="w-full">
      <CountUp
        end={amount}
        prefix="$"
        decimals={2}
        duration={1.5}
      />
    </div>
  );
}

export default AnimatedCounter;
