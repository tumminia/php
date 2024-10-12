<?php
class App {
    public function run() {
        $path = "/php";
        if(empty($_SESSION['XSRF-TOKEN'])) {
            $_SESSION['XSRF-TOKEN'] = $this->tokenCsrf();
        }
        $name = "XSRF-TOKEN";
        $value = $_SESSION['XSRF-TOKEN'];
        $time = time() + 60*60;
        
        setcookie($name,$value,$time,$path);
        session_start();
        session_write_close();
    }

    public function tokenCsrf() {
        return bin2hex(random_bytes(64));
    }

    public function query($comune) {
        $server="localhost";
        $user="root";
        $pwd="password";
        $database="italia";
        $json = [];
        $row = [];

        $con = new mysqli($server, $user, $pwd, $database);

        if($con->connect_error) {
            die("Failed Connession :" . $con->connect_error);
        } else {
            $query = 'SELECT * FROM comuni WHERE comune LIKE "' . $comune . '"';
            $result = $con->query($query);

            if($result->num_rows>0) {
                try {
                    for($i=0;$row = $result->fetch_assoc();$i++) :
                        $json[$i]['comune'] = $row['comune'];
                        $json[$i]['provincia'] = $row['provincia'];
                        $json[$i]['cap'] = $row['cap'];
                        $json[$i]['regione'] = $row['regione'];
                    endfor;
                } catch(mysqli_sql_exception $e) {
                    die('Error ' . $e->getMessage());
                }
                
            } else {
                $json[0]["Comune"] = "Errore";
            }

        }

        $con->close();
        return json_encode($json);
    }

    public function queryPG() {
        $host = "localhost";
        $port = 5432;
        $user = "postgres";
        $pwd = "password";
        $dbname = "ristorante";
        $array = [];
        $i=0;
        $query = "SELECT * FROM frigorifero";
        try {
            $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$pwd");

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            foreach($conn->query($query) as $row) :
                $array[$i]['ingrediente'] = $row['ingrediente'];
                $array[$i]['quantita'] = $row['quantita'];
                $array[$i]['giacenza'] = $row['giacenza'];
                $i++;
            endforeach;
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        
        $conn = null;
        echo json_encode($array);        
    }

    public function language() {
        if(!empty($_COOKIE['lang'])) :
            echo 'lang="' . $_COOKIE['lang'] . '"';
        endif;
    }
}
?>

<?php $object = new App(); ?>
<?php $object->run(); ?>
