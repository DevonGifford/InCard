import Link from "next/link";

interface CustomLinkProps {
  source: string;
  title: string;
  secure: boolean;
  client: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  source,
  title,
  secure,
  client,
}) => {
  return (
    <div>
      <Link href={source}>
        <div className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1 text-white hover:text-cyan-950">
          <span>{title}...</span>

          <div className="flex flex-col md:flex-row md:gap-2 text-sm font-semibold">
            <div className="text-green-950">
              {secure ? (
                <span>Protected page</span>
              ) : (
                <span>Unprotected page</span>
              )}
            </div>

            <div className="text-gray-200/60">
              {client ? <span>Client Side</span> : <span>Server Side</span>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CustomLink;
