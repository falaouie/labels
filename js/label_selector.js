function itemSelection(selected) {
  let selectedItemValue = document.getElementById(selected).value;
  let selectedItemName = document.getElementById(selected).name;
  let clearBtn = document.getElementById('selection0');

  if (document.getElementById(selected).style.backgroundColor == 'white') {
    for (var i = 1; i <= 9; i++) {
      document.getElementById('selection' + i).style.backgroundColor = 'white';
    }
    document.getElementById(selected).style.backgroundColor = 'limegreen';
    for (var i = 1; i <= 24; i++) {
      if (document.getElementById('btn' + i).value.slice(0, 3) == 'Lab') {
        document.getElementById('btn' + i).value = 'Start Here #' + i;
        document.getElementById('btn' + i).disabled = false;
      } else {
        break;
      }
    }
  }
  if (selectedItemValue == clearBtn.value) {
    for (var i = 1; i <= 9; i++) {
      document.getElementById('selection' + i).style.backgroundColor = 'white';
      document.getElementById('selection' + i).disabled = false;
    }
    for (var i = 1; i <= 24; i++) {
      document.getElementById('btn' + i).value = 'Label ' + i;
      document.getElementById('btn' + i).disabled = true;
      document.getElementById('btn' + i).style.backgroundColor = 'white';
      document.getElementById('td' + i).style.visibility = 'visible';
    }
  }
}

function labelSelector(id) {
  if (
    document.getElementById('btn' + id).value != 'End Here # ' + id &&
    document.getElementById('btn' + id).value != 'Start Here #' + id
  ) {
    // to select 1 item only
    for (var i = id - 1; i >= 1; i--) {
      document.getElementById('btn' + i).style.backgroundColor = 'white';
      document.getElementById('btn' + i).value = 'Label #' + i;
      document.getElementById('btn' + i).disabled = true;
      document.getElementById('td' + i).style.visibility = 'visible';
      document.getElementById(i).value = 'none';
    }
    for (var i = 1; i <= 9; i++) {
      document.getElementById('selection' + i).style.backgroundColor = 'white';
      document.getElementById('selection' + i).disabled = false;
    }
  }

  if (document.getElementById('btn' + id).value == 'Start Here #' + id) {
    document.getElementById('btn' + id).style.backgroundColor = 'limegreen';

    for (var i = 1; i <= 9; i++) {
      if (
        document.getElementById('selection' + i).style.backgroundColor ==
        'limegreen'
      ) {
        document.getElementById('btn' + id).value = document.getElementById(
          'selection' + i
        ).value;
        // heading input start here
        document.getElementById('heading' + id).innerText =
          document.getElementById('selection' + i).value;
        document.getElementById(id).value = document.getElementById(
          'selection' + i
        ).name;
      } else {
        document.getElementById('selection' + i).disabled = true;
      }
    }
    for (var i = id - 1; i >= 1; i--) {
      document.getElementById('btn' + i).style.backgroundColor = 'white';
      document.getElementById('btn' + i).value = 'End Here # ' + i;
    }
    for (var i = id + 1; i <= 24; i++) {
      if (
        document.getElementById('btn' + i).style.backgroundColor == 'limegreen'
      ) {
        break;
      } else {
        document.getElementById('btn' + i).style.backgroundColor = 'lightgrey';
        document.getElementById('btn' + i).value = i;
        document.getElementById('td' + i).style.visibility = 'hidden';
        document.getElementById(i).value = 'none';
      }
    }
  }

  if (document.getElementById('btn' + id).value == 'End Here # ' + id) {
    let selectionInput = 'none';
    for (var i = id + 1; i <= 24; i++) {
      if (document.getElementById('btn' + i).value.slice(0, 3) == 'End') {
        continue;
      } else {
        let selectionStartText = document.getElementById('btn' + i).value;
        if (document.getElementById(i).value != null) {
          selectionInput = document.getElementById(i).value;
        }

        let finito = false;
        for (var i = id; i <= 24; i++) {
          if (document.getElementById('btn' + i).value.slice(0, 3) == 'End') {
            document.getElementById('btn' + i).style.backgroundColor =
              'limegreen';
            document.getElementById('btn' + i).value = selectionStartText;
            document.getElementById('heading' + i).innerText =
              selectionStartText;
            document.getElementById(i).value = selectionInput;
            // alert('selection input ' + selectionInput);
          } else {
            finito = true;
            break;
          }
        }
        for (var i = id - 1; i >= 1; i--) {
          document.getElementById('btn' + i).style.backgroundColor = 'white';
          document.getElementById('btn' + i).value = 'Label #' + i;
          document.getElementById('btn' + i).disabled = true;
        }
      }
      if ((finito = true)) {
        break;
      }
    }
    for (var i = 1; i <= 9; i++) {
      document.getElementById('selection' + i).style.backgroundColor = 'white';
      document.getElementById('selection' + i).disabled = false;
    }
  }
}
