"use client";

import { useReportWebVitals } from "next/web-vitals";

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

const handleWebVitals: ReportWebVitalsCallback = (metric) => {
  console.debug(metric);
  switch (metric.name) {
    case "FCP": {
      // handle FCP results
    }
    case "LCP": {
      // handle LCP results
    }
  }
};

export function WebVitals() {
  useReportWebVitals(handleWebVitals);
  return null;
}
