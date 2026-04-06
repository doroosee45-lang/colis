// ─────────────────────────────────────────────────────
//  Point d'entrée unique — importer depuis ce fichier
//
//  Exemple d'utilisation :
//    import { agencyService, packageService } from "@/api";
//    import api from "@/api/axios";   ← instance brute si besoin
// ─────────────────────────────────────────────────────

export { default as api }               from "./axios";
export { default as authService }       from "./authService";
export { default as agencyService }     from "./agencyService";
export { default as clientService }     from "./clientService";
export { default as packageService }    from "./packageService";
export { default as paymentService }    from "./paymentService";
export { default as employeeService }   from "./employeeService";
export { default as marketplaceService }from "./marketplaceService";
export { default as analyticsService }  from "./analyticsService";