// scores/custom-shotcharts.js
(function () {
  // Nome da cercare nelle tendine dei shot chart
  const TEAM_NAME = "San Vito";

  function keepOnlySanVitoColumn() {
    const table = document.getElementById("charts");
    if (!table) return;

    const rows = Array.from(table.rows);
    if (rows.length === 0) return;

    // Prima riga = header con le 2 select (una per San Vito, una per gli avversari)
    const headerRow = rows[0];
    const headerCells = Array.from(headerRow.children);
    if (headerCells.length < 2) return;

    // Scopri quale colonna è del San Vito guardando la select selezionata
    let keepIndex = 0; // di default tengo la colonna di sinistra

    headerCells.forEach((cell, idx) => {
      const select = cell.querySelector("select");
      if (!select) return;

      const selectedText = select.options[select.selectedIndex]?.text || "";
      if (selectedText.toLowerCase().includes(TEAM_NAME.toLowerCase())) {
        keepIndex = idx; // se qui c'è "San Vito", tengo questa colonna
      }
    });

    // Ora, per ogni riga della tabella, rimuovo le celle delle altre colonne
    rows.forEach((row) => {
      const cells = Array.from(row.children);

      // se ci sono più celle (header, riga con i due grafici, ecc.)
      if (cells.length > 1) {
        cells.forEach((cell, idx) => {
          if (idx !== keepIndex) {
            cell.remove(); // elimina le colonne non-San Vito
          }
        });
      }

      // Sistemiamo le righe-titolo (Q1, Q2, Totals) che avevano colspan="2"
      const titleCell = row.querySelector("td[colspan]");
      if (titleCell && titleCell.colSpan > 1) {
        titleCell.colSpan = 1;
      }
    });
  }

  function onReady(fn) {
    if (document.readyState === "complete") {
      fn();
    } else {
      window.addEventListener("load", fn);
    }
  }

  // Aspetto che la pagina (e quindi ESGameBoxScoreApp) abbia costruito i chart
  onReady(keepOnlySanVitoColumn);
})();
