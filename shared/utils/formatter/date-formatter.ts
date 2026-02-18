import { DateUtils } from "@/shared/utils/date/date-utils";

export type DateFormatterFormatOptions = {
  day?: Intl.DateTimeFormatOptions["day"];
  month?: Intl.DateTimeFormatOptions["month"];
  year?: Intl.DateTimeFormatOptions["year"];
  hour?: Intl.DateTimeFormatOptions["hour"];
  minute?: Intl.DateTimeFormatOptions["minute"];
  locale?: string;
  timeZone?: string;
};

export class DateFormatter {
  private static readonly formatterStore = new Map<string, Intl.DateTimeFormat>();

  static format(dateInput: Date | number | string, options: DateFormatterFormatOptions): string {
    const date = DateUtils.toDateOrThrow(dateInput);
    const { locale = "en-US", timeZone = "Asia/Bangkok", ...dateFormatOptions } = options;

    const intlOptions: DateFormatterFormatOptions = {
      ...dateFormatOptions,
      timeZone
    };

    const key = this.buildOptionsKey(locale, intlOptions);
    const formatter = this.getFormatterInstance(key, locale, intlOptions);
    return formatter.format(date);
  }

  private static buildOptionsKey(locale: string, options: DateFormatterFormatOptions): string {
    return JSON.stringify({ locale, options });
  }

  private static getFormatterInstance(
    key: string,
    locale: string,
    options: DateFormatterFormatOptions
  ): Intl.DateTimeFormat {
    let formatter = this.formatterStore.get(key);
    if (formatter) {
      return formatter;
    }
    formatter = new Intl.DateTimeFormat(locale, options);
    this.formatterStore.set(key, formatter);
    return formatter;
  }
}
