<?php
$data = new ArrayObject();

if(isset($_FILES['file']['tmp_name'])){
    $path = "files/";
	$fileName = $path.$_FILES['file']['name'];

	if(move_uploaded_file($_FILES['file']['tmp_name'], $fileName)){
		$return['success'] = true;
		$return['message'] = "Fil uppladdad";
		echo json_encode($return);

	}else{
		$return['success'] = false;
		$return['message'] = "Kunde inte ladda upp filen";
		echo json_encode($return);
	}
} else {
	$return['success'] = false;
	$return['message'] = "Ingen fil med-skickad";
	echo json_encode($return);
}
?>
