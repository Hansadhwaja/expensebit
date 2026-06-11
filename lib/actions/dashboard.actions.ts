"use server";

import { USER } from "@/constants";
import { ActionResponse } from "../types";
import { DashboardSummary } from "../types/dashboard.types";
import { getDashboardSummaryService } from "../services/dashboard.services";

export async function getDashboardSummaryAction(): Promise<ActionResponse<{ summary: DashboardSummary }>> {
    try {
        const user = USER;
        const summary = await getDashboardSummaryService(user.id);

        return {
            success: true,
            message: "Dashboard Summary Fetched Successfully",
            data: { summary }
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_SUMMARY_ACTION]", error);
        return {
            success: false,
            message: "Error while fetching dashboard summary"
        }
    }
}