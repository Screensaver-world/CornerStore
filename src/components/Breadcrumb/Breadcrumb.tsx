import React, { FC } from "react";
import Arrow from "./Arrow.svg";
type BreadcrumbTypes = {
  path: BreadcrumbItem[];
};
import styles from "./Breadcrumb.module.css";

type BreadcrumbItem = { label: string; url: string };

const SELECTED_TEXT_COLOR =
  "text-transparent bg-clip-text bg-gradient-to-b from-primary-start to-primary-stop";

const Breadcrumb: FC<BreadcrumbTypes> = ({ path }) => {
  const pathLength = path.length;
  return (
    <nav
      className={`${styles.breadcrumb} text-white relative flex w-max bg-green bg-secondary py-2`}
      aria-label="Breadcrumb"
    >
      <ol role="list" className="rounded-md px-6 flex space-x-4">
        {path.map((item, idx) => (
          <>
            <li className="flex">
              <div className="flex items-center">
                <a
                  href={item.url}
                  className={`text-sm font-medium hover:text-primary-stop ${
                    pathLength === idx + 1 ? SELECTED_TEXT_COLOR : ""
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              </div>
            </li>
            {pathLength !== idx + 1 && (
              <img className="flex-shrink-0 w-4" src={Arrow} />
            )}
          </>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;
