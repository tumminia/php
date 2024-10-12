const check = (id) =>{document.getElementById(id).checked = false;}

const setCookies = (name)=>{
	const time = new Date();
	const threeDays = 3*24*60*60*1000;
    var myCookies = [];
    let value = "";
	let x = document.getElementById('all').value;
	let z = document.getElementById('lang').value;
	
	if($("#all").is(":checked")) {
		value = "{cookies_all}";
	}
	
	if($("#necessary").is(":checked")) {
		value = "{cookies_necessary}";
		
	}
	
    myCookies = getCookies();

	time.setTime(time.getTime() + (threeDays));
	let expires = "expires="+time.toUTCString();
	if(myCookies['Information']!="{cookies:necessary}" && name!='Utente' && name!='XSRF-TOKEN') {
		document.cookie = "lang="+z+";"+expires+";path=/gitproject;"//.split(";");
		document.cookie = name+"="+value+";"+expires+";path=/gitproject;".split(";");
		location.reload();
	}
}

const getCookies = ()=>{
    let array = [];
    let name = document.cookie;
    name = name.split('; ')
    
    for(var i in name) {
        var x = name[i].indexOf('=');
        var y = name[i].length;
        
        array[name[i].substring(0,x)] = decodeURIComponent(name[i].substring(x+1,y));
    }
    
    return array; 
}

const root = (id)=>{
    return ReactDOM.createRoot(document.getElementById(id));
}

class Run extends React.Component{
    cookieContainer_IT() {
	    let tag =(
		<>
		<div className="mt-3 mb-3">
		<div className="mt-3 mb-3">
		<h4>Prima di continuare su:<br/>
		{location.href}
		</h4>
		</div>
		<hr/>
		<div className="mt-3 mb-3">
		<p>Il protocollo Http non mantiene lo stato, chiusa la connessione, i dati sono distrutti.</p>
		<p><i className='bi bi-cookie'> </i>I cookie sono necessari per mantenere lo stato della connessione.</p>
		<p>Accetti tutti i cookie o strettamente necessari?</p>
		</div>
		<hr/>
		
		<form>
		<div className="mt-3">
		<label>&#127757;
		<select id="lang" onChange={()=>english()}>
		<option value="it-IT">&#127470;&#127481;</option>	
		<option value="en-EN">&#127468;&#127463;</option>
		</select>
		</label>
		</div>
		
		<div className="mt-3">
		<label>Accetti Tutti i cookie:
		<input type="radio" id="all" onClick={()=>check('necessary')}/>
		</label>
		
		<label>Accetti i cookie necessari:
		<input type="radio" id="necessary" onClick={()=>check('all')} defaultChecked/>
		</label>
		
		<button id="accettaCookie" onClick={()=>setCookies('Information')}><i className="bi bi-hand-thumbs-up-fill"> </i>Accetta</button>
		
		</div>
		</form>
		</div>
		</>
		);
		
		return tag;
	}

    cookieContainer_EN() {
	    let tag =(
		<>
		<div className="mt-3 mb-3">
		<div className="mt-3 mb-3">
		<h4>Before continuing on:<br/>
		{location.href}
		</h4>
		</div>
		<hr/>
		<div className="mt-3 mb-3">
		<p>The Http protocol does not maintain the state, closed the connection, data is destroyed.</p>
		<p><i className='bi bi-cookie'> </i> Cookies are necessary to maintain the connection status.</p>
		<p>Do you accept all cookies or strictly necessary?</p>
		</div>
		<hr/>
		
		<form>
		<div className="mt-3">
		<label>&#127757;
		<select id="lang" onChange={()=>english()}>
		<option value="en-EN">&#127468;&#127463;</option>
		<option value="it-IT">&#127470;&#127481;</option>
		</select>
		</label>
		</div>
		
		<div className="mt-3">
		<label>You accept All cookies:
		<input type="radio" id="all" onClick={()=>check('necessary')}/>
		</label>
		
		<label>You accept the necessary cookies:
		<input type="radio" id="necessary" onClick={()=>check('all')} defaultChecked/>
		</label>
		
		<button id="accettaCookie" onClick={()=>setCookies('Information')}><i className="bi bi-hand-thumbs-up-fill"> </i>Accept</button>
		
		</div>
		</form>
		</div>
		</>
		);
		
		return tag;
	}

    thead() {
        var tag = "";
        var myCookies = [];
        myCookies = getCookies();

		tag = (
		<>
		<tr>
		<th colSpan={4}>CAP di tutte le città Italiane</th>
		</tr>
		<tr>
		<th>Città</th>
		<th>CAP</th>
		<th>Provincia</th>
		<th>Regione</th>
		</tr>
		</>
		);

        if(myCookies['lang']!=null) {
            switch(myCookies['lang']) {
                case 'en-EN':
                tag = (
                <>
                <tr>
                <th colSpan={4}>CAP of all Italian cities</th>
                </tr>
                <tr>
                <th>City</th>
                <th>CAP</th>
                <th>Province</th>
                <th>Region</th>
                </tr>
                </>
                );
                break;
            }
        }

        return tag; 
    }
}

const object = new Run();
root('cookieContainer').render(<object.cookieContainer_IT/>);
root('thead').render(<object.thead/>);

addEventListener("load",()=>{
    var myCookies = [];
    myCookies = getCookies();

    if(myCookies["Information"]==null) {
        document.getElementById("cookieContainer").style.display = "block";
    }
});

function english(){
	var lang = "";
	lang = $("#lang").val();
	if(lang==="en-EN") {
		root('cookieContainer').render(<object.cookieContainer_EN/>);
		lang = "";
	} else {
		root('cookieContainer').render(<object.cookieContainer_IT/>);
	}
}