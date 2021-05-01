

// credits: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side/24922761#24922761

export const exportCSV = (filename: string, contents: string) => {
    const blob = new Blob([contents], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
      return
    }

    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
}
