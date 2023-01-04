import classNames from "classnames";

interface TableRowProps {
  title: string;
  categori: string;
  item: string;
  price: number;
  status: "Pending" | "Success" | "Failed";
  image: string;
}
export default function TableRow(props: TableRowProps) {
  const { title, categori, item, price, status, image } = props;
  const statusClass = classNames({
    "float-start icon-status": true,
    pending: status === "Pending",
    success: status === "Success",
    failed: status === "Failed",
  });
  return (
    <tbody>
      <tr className="align-middle">
        <th scope="row">
          <img
            className="float-start me-3 mb-lg-0 mb-3"
            src={`/img/${image}.png`}
            width={80}
            height={60}
            alt="game thumb"
          />
          <div className="game-title-header">
            <p className="game-title fw-medium text-start color-palette-1 m-0">
              {title}
            </p>
            <p className="text-xs fw-normal text-start color-palette-2 m-0">
              {categori}
            </p>
          </div>
        </th>
        <td>
          <p className="fw-medium color-palette-1 m-0">{item}</p>
        </td>
        <td>
          <p className="fw-medium text-start color-palette-1 m-0">Rp {(price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
        </td>
        <td>
          <div>
            <span className={statusClass}></span>
            <p className="fw-medium text-start color-palette-1 m-0 position-relative">
              {status}
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
