import Link from "next/link";

// FIXME: bad smell
interface SidebarLink {
  source: string;
  title: string;
  secure: boolean;
  client: boolean;
}

const SidebarLink: React.FC<SidebarLink> = ({
  source,
  title,
  secure,
  client,
}) => {
  return (
    <div>
      <Link href={source}>
        <div className="transition ease-in-out duration-150 hover:scale-95 text-white hover:text-cyan-950">
          <h2>{title}</h2>

          <aside className="flex flex-col md:flex-row md:gap-3 text-xs font-semibold ml-2">
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
          </aside>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLink;
