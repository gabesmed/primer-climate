import React from 'react';

export default function PlayBusiness({ player, scenario }) {
  let productProfitTotal = 0;
  const rows = player.products
    .filter(product => product.isActive)
    .map(product => {
      const cogs = product.productionPerYear * product.costToProduce;
      const salesPerYear = Math.min(product.productionPerYear,
        product.demandPerYear);
      const revenue = salesPerYear * product.salePrice;
      const profit = revenue - cogs;
      productProfitTotal += profit;
      return (
        <tr>
          <th>{product.title}</th>
          <td>{product.productionPerYear}/yr</td>
          <td>{product.demandPerYear}/yr</td>
          <td>${product.costToProduce.toFixed(2)}</td>
          <td>${product.salePrice.toFixed(2)}</td>
          <td>${profit.toFixed(2)}</td>
        </tr>
      );
    });

  const payroll = -1 * player.numEmployees * player.employeeSalary;
  const total = productProfitTotal + payroll;

  return (
    <div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Product</th>
            <th>Production</th>
            <th>Sales</th>
            <th>Cost to produce</th>
            <th>Sale price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <th>Payroll</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${payroll.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Fixed costs</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>-$0.00</td>
          </tr>
          <tr>
            <th>Total profit</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

PlayBusiness.propTypes = {
  player: React.PropTypes.object.isRequired,
  scenario: React.PropTypes.object.isRequired
};
