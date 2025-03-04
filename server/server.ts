/**
 * Licence: Robert Koch-Institut (RKI), dl-de/by-2-0
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * Author: https://github.com/marcelrebmann/
 * Source: https://github.com/marcelrebmann/corona-widget-ios
 * 
 * Version: 1.2.0
 */

import { Connector } from "./src/connectors/base.connector";
import { VaccinationConnector } from "./src/connectors/vaccination.connector";
import { IncidenceConnector } from "./src/connectors/incidence.connector";
import { RValueConnector } from "./src/connectors/rvalue.connector";
import { CoronaServer } from "./src/corona-server";
import path from "path";

// Path to the persistent data directory and the data filename
const DATA_FILENAME = "data.json";
const DATA_DIRECTORY_PATH = path.join(__dirname, "./data/");
const DATA_FILE_PATH = path.join(DATA_DIRECTORY_PATH, DATA_FILENAME);

// Path to the persistent backup directory and the backup filename
const DATA_BACKUP_FILENAME = "data.backup.json";
const BACKUP_DIRECTORY_PATH = path.join(__dirname, "./backups/");
const DATA_BACKUP_FILEPATH = path.join(BACKUP_DIRECTORY_PATH, DATA_BACKUP_FILENAME);

/**
 * The active connectors for the corona server to update the data regularly.
 * Additional custom connectors can be added to this list to get executed, too.
 */
const CONNECTORS: Connector[] = [
  new IncidenceConnector(),
  new RValueConnector(),
  new VaccinationConnector()
];

const PORT = parseInt(process.env.PORT) || 4001;

// Create a server instance and start it.
const server = new CoronaServer(DATA_FILE_PATH, DATA_BACKUP_FILEPATH, CONNECTORS, PORT);
server.start();