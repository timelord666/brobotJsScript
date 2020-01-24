$accs = [string[]]("https://vk.com/id562520616", "https://vk.com/id193717825")  # добавте сюда по прмеру ссылки на анкеты, в полном виде как в примере

foreach ($acc in $accs) {
    $accID = $acc.Split("/")
    $accID = $accID[$accID.length - 1]
    New-Item -Path ($accID + '/') -ItemType Directory
    $strings1 = select-string -path log*.txt -pattern ("recivedText1" + $acc) 

    foreach ($str in $strings1) {
        $date = $str.ToString().Split(":")[3].Split(" ")[0] + " "
        
        $str = $str.ToString().Split("/")
        
        $addToFile =  ("Date: " + $date + $str[$str.length - 1])
        $addToFile  | Add-Content ($accID +  "/on first msg recived by " + $accID +  ".txt")
    }
        $strings2 = select-string -path log*.txt -pattern ("recivedText2" + $acc) 

    foreach ($str in $strings2) {
        $date = $str.ToString().Split(":")[3].Split(" ")[0] + " "
        
        $str = $str.ToString().Split("/")
        
        $addToFile =  ("Date: " + $date + $str[$str.length - 1])
        $addToFile  | Add-Content ($accID +  "/on second msg recived by " + $accID +  ".txt")
    }
        $strings3 = select-string -path log*.txt -pattern ("recivedText3" + $acc) 

    foreach ($str in $strings3) {
        $date = $str.ToString().Split(":")[3].Split(" ")[0] + " "
        
        $str = $str.ToString().Split("/")
        
        $addToFile =  ("Date: " + $date + $str[$str.length - 1])
        $addToFile  | Add-Content ($accID +  "/on third msg recived by " + $accID +  ".txt")
    }


    $count = select-string -path log*.txt -pattern ("recived1" + $acc) 
    
    if ($count -eq $null) {
        Set-Content ($accID +  "/Count Msg by " + $accID +  ".txt") "Amount of recived answers on first message ->  0"
    }
    elseif ($count.GetType().BaseType.Name -eq "Object") {
        $date = $count.ToString().Split(":")[3].Split(" ")[0] + " "
        Set-Content ($accID +  "/Count Msg by " + $accID +  ".txt") ($date + " Amount of recived answers on first message ->  1")
    } else {
        $date = $count[$count.length - 1].ToString().Split(":")[3].Split(" ")[0] + " "
        Set-Content ($accID +  "/Count Msg by " + $accID +  ".txt") ($date + " Amount of recived answers on first message ->  " + $count.length)
    }


    $count = select-string -path log*.txt -pattern ("recived2" + $acc) 
    if ($count -eq $null) {
        Add-Content ($accID +  "/Count Msg by " + $accID +  ".txt") "Amount of recived answers on second message ->  0"
    }
    elseif ($count.GetType().BaseType.Name -eq "Object") {
        $date = $count.ToString().Split(":")[3].Split(" ")[0] + " "
        Add-Content ($accID +  "/Count Msg by " + $accID +  ".txt") ($date + " Amount of recived answers on second message ->  1")
    } else {
        $date = $count[$count.length - 1].ToString().Split(":")[3].Split(" ")[0] + " "
        Add-Content ($accID +  "/Count Msg by " + $accID +  ".txt") ($date + " Amount of recived answers on second message ->  " + $count.length)
    }
    $count = select-string -path log*.txt -pattern ("recived3" + $acc) 
    if ($count -eq $null) {
        Add-Content ($accID +  "/Count Msg by " + $accID +  ".txt") "Amount of recived answers on second message ->  0"
    }
    elseif ($count.GetType().BaseType.Name -eq "Object") {
        $date = $count.ToString().Split(":")[3].Split(" ")[0] + " "
        Add-Content ($accID +  "/Count Msg by " + $accID +  ".txt") ($date + " Amount of recived answers on third message ->  1")
    } else {
        $date = $count[$count.length - 1].ToString().Split(":")[3].Split(" ")[0] + " "
        Add-Content ($accID +  "/Count Msg by " + $accID +  ".txt") ($date + " Amount of recived answers on third message ->  " + $count.length)
    }
    
}





