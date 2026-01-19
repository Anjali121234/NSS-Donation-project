import "dotenv/config";
import { seedAdmin } from "../lib/seedAdmin";  // relative path instead of "@/lib/seedAdmin"

seedAdmin().then(() => process.exit(0));