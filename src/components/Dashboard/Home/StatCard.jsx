import "./styles/StatCard.css";

export default function StatCard({
  title,
  value,
  icon,
  growth,
}) {
  return (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-card__top">
        <div>
          <p className="dashboard-stat-card__title">
            {title}
          </p>

          <h2 className="dashboard-stat-card__value">
            {value}
          </h2>
        </div>

        <div className="dashboard-stat-card__icon">
          {icon}
        </div>
      </div>

      <p className="dashboard-stat-card__growth">
        +{growth}% tuần này
      </p>
    </div>
  );
}