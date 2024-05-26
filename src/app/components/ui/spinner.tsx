// import React from "react";
//
// import { cn } from "@/lib/utils";
//
// const Spinner = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentPropsWithoutRef<"div">
// >(({ className, ...props }, ref) => {
//   const computeDelay = (i: number) => `${-1.2 + i * 0.1}s`;
//   const computeRotation = (i: number) => `${i * 30}deg`;
//   return (
//     <div
//       className={cn("size-5", className)}
//       role="status"
//       aria-label="Loading"
//       ref={ref}
//       {...props}
//     >
//       <div className="relative left-1/2 top-1/2 size-full">
//         {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
//         {[...Array(12)].map((_, i) => (
//           <div
//             key={i}
//             className="animate-spinner absolute left-[-10%] top-[-3.9%] h-[8%] w-[24%] bg-foreground"
//             style={{
//               animationDelay: computeDelay(i),
//               transform: `rotate(${computeRotation(i)}) translate(146%)`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// });
// Spinner.displayName = "Spinner";
//
// export { Spinner };


import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex align-middle justify-center w-full h-full">
      <Loader2
        className={cn('my-28 text-primary/60 animate-spin', className)}
      />
    </div>

  );
};

export { Spinner };
