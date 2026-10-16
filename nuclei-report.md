tomas@LAPTOP-JK5OEQ3H:/mnt/c/Users/tomas/OneDrive/Escritorio/UAA/Noveno Semestre/Ciberseguridad/React,ldap_JWT/videogames-ldap-jwt-lab$ docker compose -f backend/docker-compose.yml --profile scan run --rm nuclei   -target http://videogames-frontend:80   -o /reports/frontend-report.txt

                     __     _
   ____  __  _______/ /__  (_)
  / __ \/ / / / ___/ / _ \/ /
 / / / / /_/ / /__/ /  __/ /
/_/ /_/\__,_/\___/_/\___/_/   v3.11.1

                projectdiscovery.io

[INF] nuclei-templates are not installed, installing...
[INF] Successfully installed nuclei-templates at /root/nuclei-templates
[INF] Current nuclei version: v3.11.1 (latest)
[INF] Current nuclei-templates version: v10.5.0 (latest)
[INF] New templates added in latest release: 295
[INF] Templates loaded for current scan: 11144
[INF] Executing 11144 signed templates from projectdiscovery/nuclei-templates
[INF] Targets loaded for current scan: 1
[INF] Templates clustered: 2724 (Reduced 2588 Requests)
[INF] Using Interactsh Server: oast.site
[swagger-api] [http] [info] http://videogames-frontend:80/docs [paths="/docs"]
[waf-detect:nginxgeneric] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:referrer-policy] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:cross-origin-embedder-policy] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:strict-transport-security] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:x-frame-options] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:x-content-type-options] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:x-permitted-cross-domain-policies] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:cross-origin-opener-policy] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:cross-origin-resource-policy] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:content-security-policy] [http] [info] http://videogames-frontend:80
[http-missing-security-headers:permissions-policy] [http] [info] http://videogames-frontend:80
[nginx-version] [http] [info] http://videogames-frontend:80 ["nginx/1.31.7"]
[tech-detect:google-font-api] [http] [info] http://videogames-frontend:80
[tech-detect:nginx] [http] [info] http://videogames-frontend:80
[missing-sri] [http] [info] http://videogames-frontend:80/ ["https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap"]
[INF] Skipped videogames-frontend:4040 from target list as found unresponsive permanently: cause="port closed or filtered" address=videogames-frontend:4040 chain="connection refused; got err while executing https://videogames-frontend:4040/jobs/?\"'><script>alert(document.domain)</script>"
[INF] Skipped videogames-frontend:5814 from target list as found unresponsive permanently: Get "https://videogames-frontend:5814/autopass": cause="port closed or filtered" address=videogames-frontend:5814 chain="connection refused"
[openapi] [http] [info] http://videogames-frontend:80/openapi.json
[INF] Scan completed in 2m. 17 matches found.
[INF] HTTP connections: 13815 total, 2112 new, 11703 reused (84.7%)

####Ultimo escaneo nuclei####
[waf-detect:nginxgeneric] y [tech-detect:nginx] son mensajes informativos respecto al uso de tecnologias utilizadas en el Api, no encontre forma de eliminar dicho informe ya que como tal no son una vulnerabilidad.


tomas@LAPTOP-JK5OEQ3H:/mnt/c/Users/tomas/OneDrive/Escritorio/UAA/Noveno Semestre/Ciberseguridad/React,ldap_JWT/videogames-ldap-jwt-lab$ docker compose -f backend/docker-compose.yml --profile scan run --rm nuclei   -target http://videogames-frontend:80

                     __     _
   ____  __  _______/ /__  (_)
  / __ \/ / / / ___/ / _ \/ /
 / / / / /_/ / /__/ /  __/ /
/_/ /_/\__,_/\___/_/\___/_/   v3.11.1

                projectdiscovery.io

[INF] nuclei-templates are not installed, installing...
[INF] Successfully installed nuclei-templates at /root/nuclei-templates
[INF] Current nuclei version: v3.11.1 (latest)
[INF] Current nuclei-templates version: v10.5.0 (latest)
[INF] New templates added in latest release: 295
[INF] Templates loaded for current scan: 11144
[INF] Executing 11144 signed templates from projectdiscovery/nuclei-templates
[INF] Targets loaded for current scan: 1
[INF] Templates clustered: 2724 (Reduced 2588 Requests)
[INF] Using Interactsh Server: oast.online
[waf-detect:nginxgeneric] [http] [info] http://videogames-frontend:80
[INF] Skipped videogames-frontend:5814 from target list as found unresponsive permanently: Get "https://videogames-frontend:5814/autopass": cause="port closed or filtered" address=videogames-frontend:5814 chain="connection refused"
[tech-detect:nginx] [http] [info] http://videogames-frontend:80
[INF] Skipped videogames-frontend:4040 from target list as found unresponsive permanently: cause="port closed or filtered" address=videogames-frontend:4040 chain="connection refused; got err while executing https://videogames-frontend:4040/jobs/?\"'><script>alert(document.domain)</script>"
[INF] Scan completed in 2m. 2 matches found.
[INF] HTTP connections: 13844 total, 2046 new, 11798 reused (85.2%)