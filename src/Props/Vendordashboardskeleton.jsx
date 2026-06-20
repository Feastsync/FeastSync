import "./Css/Vendordashboardskeleton.css"
const VendorDashboardSkeleton = () => (
  <main className="vendordashboard-vendor-dashboard-container vendordashboard-skeleton">
    <div className="vds-header" />

    <div className="vds-hero">
      <div className="vds-hero-banner" />
      <div className="vds-hero-avatar" />
    </div>

    <div className="vendordashboard-vendor-details-container">
      <div className="vendordashboard-trust-stats">
        <div className="vds-line vds-w-30" style={{ marginBottom: 16 }} />
        <div className="vendordashboard-stats-row">
          {[0, 1, 2, 3].map((i) => (
            <div className="vds-stat-block" key={i}>
              <div className="vds-line vds-w-50" />
              <div className="vds-line vds-w-70" />
            </div>
          ))}
        </div>
      </div>

      <div className="vendordashboard-vendor-bio">
        <div className="vds-line vds-w-40" style={{ height: 20, marginBottom: 14 }} />
        <div className="vds-line vds-w-90" />
        <div className="vds-line vds-w-80" />
        <div className="vds-line vds-w-60" />
      </div>
    </div>

    <section className="vendordashboard-pricing-section">
      <div className="vds-line vds-w-30" style={{ height: 24, marginBottom: 20 }} />
      <div className="vendordashboard-pricing-grid">
        {[0, 1, 2].map((i) => (
          <div className="vendordashboard-pricing-card vds-card" key={i}>
            <div className="vds-line vds-w-60" style={{ height: 18 }} />
            <div className="vds-line vds-w-30" style={{ height: 22, marginTop: 8, marginBottom: 18 }} />
            <div className="vds-line vds-w-90" />
            <div className="vds-line vds-w-80" />
            <div className="vds-line vds-w-70" />
            <div className="vds-button" />
          </div>
        ))}
      </div>
    </section>

    <div className="vds-block" style={{ height: 220, margin: "32px 24px" }} />
    <div className="vds-gallery">
      {[0, 1, 2, 3].map((i) => (
        <div className="vds-block vds-gallery-item" key={i} />
      ))}
    </div>
  </main>
);
export default VendorDashboardSkeleton