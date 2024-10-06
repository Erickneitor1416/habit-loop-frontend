import { AvatarImage, Avatar as AvatarRoot } from '@/components/ui/avatar';
interface AvatarProps {
  name: string;
}
export default function Avatar({ name }: Readonly<AvatarProps>) {
  return (
    <div className="flex gap-3 justify-center items-center md:flex-row flex-col-reverse">
      <h1 className="font-semibold">{name}</h1>
      <AvatarRoot>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </AvatarRoot>
    </div>
  );
}
