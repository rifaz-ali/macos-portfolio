import dayjs from "dayjs"

import { navLinks,navIcons } from "../constants"

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" srcset="" />
            <p className="font-bold">Rifaz's Macfolio</p>

            <ul>
                {navLinks.map((item) => (
                    <li key={item.id}><p>{item.name}</p></li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                 {navIcons.map(({id, img}) => (
                    <li key={id}>
                        <img src={img} className="icon-hover" alt={`Icon ${id}`} />
                    </li>
                ))}
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  )
}

export default Navbar