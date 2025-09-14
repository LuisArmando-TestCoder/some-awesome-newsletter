<div class="billing-dashboard">
  <h1 class="billing-header">Billing & Subscriptions</h1>

  <!-- Current Plan Section -->
  <div class="billing-section current-plan">
    <h2 class="section-title">Current Plan</h2>
    <div class="card">
      <div class="plan-details">
        <h3 class="current-plan-name">Weekly Plan</h3>
        <p class="current-plan-price">$19 per month</p>
        <p class="plan-renewal-date">Next renewal on October 13, 2025.</p>
      </div>
      <button class="cancel-plan-button">Cancel Subscription</button>
    </div>
  </div>

  <!-- Upgrade Plan Section -->
  <div class="billing-section upgrade-plan">
    <h2 class="section-title">Upgrade Your Plan</h2>
    <div class="plan-options">
      <div class="plan-option-card">
        <h3 class="plan-option-title">Daily</h3>
        <p class="plan-option-price">$49/month</p>
        <ul class="plan-option-features">
          <li>Automatic daily newsletters</li>
          <li>Unlimited websites</li>
          <li>Full analytics suite</li>
        </ul>
        <button class="upgrade-button">Upgrade to Daily</button>
      </div>
      <div class="plan-option-card">
        <h3 class="plan-option-title">Full Service</h3>
        <p class="plan-option-price">$100 one-time</p>
        <ul class="plan-option-features">
          <li>Everything in Daily</li>
          <li>Premium features</li>
          <li>Lifetime updates</li>
        </ul>
        <button class="upgrade-button">Purchase Full Service</button>
      </div>
    </div>
  </div>

  <!-- Payment Method Section -->
  <div class="billing-section payment-method">
    <h2 class="section-title">Payment Method</h2>
    <div class="card">
      <div class="payment-details">
        <p class="card-info">Visa ending in 1234</p>
        <p class="card-expiry">Expires 12/2028</p>
      </div>
      <button class="update-payment-button">Update Card</button>
    </div>
  </div>

  <!-- Billing History Section -->
  <div class="billing-section billing-history">
    <h2 class="section-title">Billing History</h2>
    <div class="card">
      <table class="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sep 13, 2025</td>
            <td>Weekly Plan Subscription</td>
            <td>$19.00</td>
            <td><a href="#" class="invoice-link">Download</a></td>
          </tr>
          <tr>
            <td>Aug 13, 2025</td>
            <td>Weekly Plan Subscription</td>
            <td>$19.00</td>
            <td><a href="#" class="invoice-link">Download</a></td>
          </tr>
          <tr>
            <td>Jul 13, 2025</td>
            <td>Weekly Plan Subscription</td>
            <td>$19.00</td>
            <td><a href="#" class="invoice-link">Download</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .billing-dashboard {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 20px;
    background-color: #f0f2f5;
    color: #333;
  }

  .billing-header {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 30px;
    color: #1a202c;
  }

  .billing-section {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 15px;
    color: #4a5568;
  }

  .card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  /* Current Plan Styles */
  .current-plan-name {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 5px 0;
  }
  .current-plan-price {
    font-size: 1rem;
    color: #555;
    margin: 0 0 10px 0;
  }
  .plan-renewal-date {
    font-size: 0.9rem;
    color: #777;
    margin: 0;
  }
  .cancel-plan-button {
    background-color: #e53e3e;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  .cancel-plan-button:hover {
    background-color: #c53030;
  }

  /* Upgrade Plan Styles */
  .plan-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  .plan-option-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
  }
  .plan-option-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .plan-option-price {
    font-size: 1.1rem;
    color: #007bff;
    margin: 10px 0;
  }
  .plan-option-features {
    list-style: none;
    padding: 0;
    margin: 15px 0;
    font-size: 0.9rem;
    color: #555;
  }
  .plan-option-features li {
    margin-bottom: 8px;
    position: relative;
    padding-left: 20px;
  }
  .plan-option-features li::before {
    content: '✔';
    color: #28a745;
    position: absolute;
    left: 0;
  }
  .upgrade-button {
    width: 100%;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s;
  }
  .upgrade-button:hover {
    background-color: #0056b3;
  }

  /* Payment Method Styles */
  .card-info {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 5px 0;
  }
  .card-expiry {
    font-size: 0.9rem;
    color: #777;
    margin: 0;
  }
  .update-payment-button {
    background-color: #6c757d;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  .update-payment-button:hover {
    background-color: #5a6268;
  }

  /* Billing History Styles */
  .history-table {
    width: 100%;
    border-collapse: collapse;
  }
  .history-table th, .history-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  .history-table th {
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a5568;
  }
  .history-table td {
    font-size: 0.95rem;
  }
  .invoice-link {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
  }
  .invoice-link:hover {
    text-decoration: underline;
  }
</style>
