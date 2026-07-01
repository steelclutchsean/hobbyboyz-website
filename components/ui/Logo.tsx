import Image from "next/image";

type LogoProps = {
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
};

// Native logo aspect ratio is 3682 x 1281 (~2.874:1).
export function Logo({ className, width, height, priority = false }: LogoProps) {
  return (
    <Image
      src="/brand/hobby-boyz-logo.png"
      alt="Hobby Boyz"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
