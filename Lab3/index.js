window.addEventListener("load", () => {
    let billTotoal = document.getElementById('billTotal');

    billTotoal.addEventListener("keypress", isNumberKey, false);
    let rangeValue = document.getElementById('range').value;
    
    let TipCalculator = document.getElementById('TipCalculator');
    TipCalculator.addEventListener('change',()=>{
        if (billTotoal.value.length != 0){
            rangeValue = document.getElementById('range').value;
            console.log(rangeValue);
            
            let tipPercentage = document.getElementById('tipPercentage');
            tipPercentage.value = rangeValue;
            let rangeValueDecimal = (parseInt(rangeValue)/100);
            let tipAmount = document.getElementById('tipAmount');
            tipAmount.value = billTotoal.value * rangeValueDecimal;
            billTotalWithTip = document.getElementById('billTotalWithTip');
            billTotalWithTip.value = parseFloat(billTotoal.value) + parseFloat(tipAmount.value);
        }       
    })


    function isNumberKey(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == 45 || charCode > 31 && (charCode < 46 || charCode > 57)){
            evt.preventDefault();
            return false;
        }
        return true;
    }
})