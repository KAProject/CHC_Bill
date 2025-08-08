function displayContent() {
    // Retrieve the value entered by the user
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const bill_no = document.getElementById("bill_no").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const ph_no = document.getElementById("ph_no").value;
    
    // Display the content in the display section
    document.getElementById("displaydate").innerText = date;
    document.getElementById("displaytime").innerText = time;
    document.getElementById("displaybill_no").innerText = bill_no;
    document.getElementById("displayname").innerText = name;
    document.getElementById("displayage").innerText = age;
    document.getElementById("displayph_no").innerText = ph_no;
}

const form = document.getElementById('gender');
const displaygender = document.getElementById('displaygender');
    
form.addEventListener('change', () => {
  const gender = form.gender.value; // Retrieves the selected value
  displaygender.textContent = gender ? gender : 'None'; // Updates the page
});


function showSections() {
    document.getElementById("section_input").style.display = "none";
    document.getElementById("section_bill").style.display = "block";
    document.getElementById("section_back_button").style.display = "block";
}

function go_back() {
    document.getElementById("section_input").style.display = "block";
    document.getElementById("section_bill").style.display = "none";
    document.getElementById("section_back_button").style.display = "none";
}

function downloadAsImage() {
    const table = document.getElementById("section_bill");
    html2canvas(table).then(canvas => {
      const link = document.createElement("a");
      link.download = "bill.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
}

  ///////////////////////////////////////////New/////////////////////////////////////////////////
  let tableData = [];

function addRow() {
    const table = document.getElementById('inputTable');
    const row = table.insertRow();
    const index = table.rows.length - 2; // Adjust to find row index

    // Create input fields in the row
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = `<input type="text" placeholder="Treatment" oninput="updateData(${index})" style="width: 185px; height: 30px;">`;
    cell2.innerHTML = `<input type="number" placeholder="Qty" oninput="updateData(${index})" style="width: 40px; height: 30px;">`;
    cell3.innerHTML = `<input type="number" placeholder="Price" oninput="updateData(${index})" style="width: 50px; height: 30px;">`;
    tableData.push({ charges: "", quantity: 0, price: 0, total: 0 });
}

function calculateTotal(index) {
    const table = document.getElementById('inputTable');
    const row = table.rows[index + 1]; // Skip header row
    const charges = row.cells[0].querySelector('input').value;
    const quantity = row.cells[1].querySelector('input').value;
    const price = row.cells[2].querySelector('input').value;

    if (!charges || !quantity || !price) {
        alert('Please fill all fields.');
        return;
    }

    const total = quantity * price;
    row.cells[3].querySelector('span').textContent = '₹' + total;

    // Update tableData for this row
    tableData[index] = { charges, quantity, price, total };

    // Refresh Section Two
    updateDisplayTable();
}

function updateData(index) {
    const table = document.getElementById('inputTable');
    const row = table.rows[index + 1];
    const charges = row.cells[0].querySelector('input').value || "";
    const quantity = row.cells[1].querySelector('input').value || 0;
    const price = row.cells[2].querySelector('input').value || 0;
    const total = quantity * price;

    // Update `tableData`
    tableData[index] = { charges, quantity, price, total };

    // Reflect changes in Section Two
    updateDisplayTable();
}

function updateDisplayTable() {
    const displayTable = document.getElementById('displayTable');

    // Clear current table
    displayTable.innerHTML = `
        <tr>
            <th>Charges</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
    `;

    // Add rows from `tableData`
    tableData.forEach((data) => {
        const row = displayTable.insertRow();
        row.insertCell(0).textContent = data.charges;
        row.insertCell(1).textContent = data.quantity;
        row.insertCell(2).textContent = data.price;
        row.insertCell(3).textContent = '₹' + data.total;
    });
}

function calculateGrandTotal() {
    let grandTotal = 0;
    tableData.forEach((data) => {
        grandTotal += data.total;
    });

    // Display the grand total on the page
    document.getElementById('grandTotalDisplay').textContent = 'Grand Total: ₹' + grandTotal;
}
//////////////////////////////New///////////////////////////////////////////