<?php
class App {
    public function run() {
        $path = "/gitproject";
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
            $query = 'SELECT * FROM comuni WHERE comune = ?';
            $st = $con->prepare($query);
            $st->bind_param('s',$comune);
            $st->execute();
            $result = $st->get_result();

            if($result->num_rows>0) {
                try {
                    for($i=0;$row = $result->fetch_assoc();$i++) :
                        $json[$i]['comune'] = htmlspecialchars(strip_tags($row['comune']));
                        $json[$i]['provincia'] = htmlspecialchars(strip_tags($row['provincia']));
                        $json[$i]['cap'] = htmlspecialchars(strip_tags($row['cap']));
                        $json[$i]['regione'] = htmlspecialchars(strip_tags($row['regione']));
                    endfor;
                } catch(mysqli_sql_exception $e) {
                    die('Error ' . $e->getMessage());
                }
            } else {
                $json[0]["Comune"] = "Errore";
            }
        }

        $st->close();
        $con->close();
        return json_encode($json);
    }

    public function queryPG($ingrediente) {
        $host = "localhost";
        $port = 5432;
        $user = "postgres";
        $pwd = "password";
        $dbname = "ristorante";
        $array = [];
        $i=0;
        $query = "SELECT * FROM frigorifero WHERE ingrediente= :ingrediente";
        try {
            $con = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$pwd");

            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $st = $con->prepare($query);
            $st->execute(['ingrediente'=>$ingrediente]);
            $result = $st->fetchAll();

            foreach($result as $row) :
                $array[$i]['ingrediente'] = htmlspecialchars(strip_tags($row['ingrediente']));
                $array[$i]['quantita'] = htmlspecialchars(strip_tags($row['quantita']));
                $array[$i]['giacenza'] = htmlspecialchars(strip_tags($row['giacenza']));
                $i++;
            endforeach;
            
            if(empty($array)) :
                $array[0]['ingrediente'] = 'Non presente in frigorifero';
            endif;
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        
        $con = null;
        echo json_encode($array);        
    }

    public function language() {
        if(!empty($_COOKIE['lang'])) :
            echo 'lang="' . $_COOKIE['lang'] . '"';
        endif;
    }

    public function printf($ptr) {
        if(!empty($ptr)) :
        echo $ptr;
        endif;  
    }
}
?>

<?php $object = new App(); ?>
<?php $object->run(); ?>
