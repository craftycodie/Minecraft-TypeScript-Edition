/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { JavaString } from "../lang/String";
import { Calendar } from "../util/Calendar";
import { Format } from "./Format";

/**
 * DateFormat is an abstract class for date/time formatting subclasses which formats and parses dates or time in a
 * language-independent manner. The date/time formatting subclass, such as SimpleDateFormat, allows for formatting
 * (i.e., date → text), parsing (text → date), and normalization. The date is represented as a Date object or as the
 * milliseconds since January 1, 1970, 00:00:00 GMT.
 */
export abstract class DateFormat extends Format {
    /** Useful constant for ERA field alignment. */
    public static readonly ERA_FIELD = 0;
    /** Useful constant for YEAR field alignment. */
    public static readonly YEAR_FIELD = 1;
    /** Useful constant for MONTH field alignment. */
    public static readonly MONTH_FIELD = 2;
    /** Useful constant for DATE field alignment. */
    public static readonly DATE_FIELD = 3;
    /** Useful constant for HOUR_OF_DAY0 field alignment. */
    public static readonly HOUR_OF_DAY1_FIELD = 4;
    /** Useful constant for HOUR_OF_DAY0 field alignment. */
    public static readonly HOUR_OF_DAY0_FIELD = 5;
    /** Useful constant for MINUTE field alignment. */
    public static readonly MINUTE_FIELD = 6;
    /** Useful constant for SECOND field alignment. */
    public static readonly SECOND_FIELD = 7;
    /** Useful constant for MILLISECOND field alignment. */
    public static readonly MILLISECOND_FIELD = 8;
    /** Useful constant for DAY_OF_WEEK field alignment. */
    public static readonly DAY_OF_WEEK_FIELD = 9;
    /** Useful constant for DAY_OF_YEAR field alignment. */
    public static readonly DAY_OF_YEAR_FIELD = 10;
    /** Useful constant for DAY_OF_WEEK_IN_MONTH field alignment. */
    public static readonly DAY_OF_WEEK_IN_MONTH_FIELD = 11;
    /** Useful constant for WEEK_OF_YEAR field alignment. */
    public static readonly WEEK_OF_YEAR_FIELD = 12;
    /** Useful constant for WEEK_OF_MONTH field alignment. */
    public static readonly WEEK_OF_MONTH_FIELD = 13;
    /** Useful constant for AM_PM field alignment. */
    public static readonly AM_PM_FIELD = 14;
    /** Useful constant for HOUR1 field alignment. */
    public static readonly HOUR1_FIELD = 15;
    /** Useful constant for HOUR0 field alignment. */
    public static readonly HOUR0_FIELD = 16;
    /** Useful constant for TIMEZONE field alignment. */
    public static readonly TIMEZONE_FIELD = 17;

    public static override Field = class Field extends Format.Field {
        /**Constant identifying the AM_PM field. */
        public static readonly AM_PM = new DateFormat.Field(new JavaString("am pm"), Calendar.AM_PM);
        /**Constant identifying the DATE field. */
        public static DATE = new DateFormat.Field(new JavaString("date"), Calendar.DATE);
        /**Constant identifying the DAY_OF_WEEK field. */
        public static DAY_OF_WEEK = new DateFormat.Field(new JavaString("day of week"), Calendar.DAY_OF_WEEK);
        /**Constant identifying the DAY_OF_WEEK_IN_MONTH field. */
        public static DAY_OF_WEEK_IN_MONTH =
            new DateFormat.Field(new JavaString("day of week in month"), Calendar.DAY_OF_WEEK_IN_MONTH);
        /**Constant identifying the DAY_OF_YEAR field. */
        public static DAY_OF_YEAR = new DateFormat.Field(new JavaString("day of year"), Calendar.DAY_OF_YEAR);
        /**Constant identifying the ERA field. */
        public static ERA = new DateFormat.Field(new JavaString("era"), Calendar.ERA);
        /**Constant identifying the HOUR0 field. */
        public static HOUR0 = new DateFormat.Field(new JavaString("hour0"), Calendar.HOUR);
        /**Constant identifying the HOUR1 field. */
        public static HOUR1 = new DateFormat.Field(new JavaString("hour1"), -1);
        /**Constant identifying the HOUR_OF_DAY0 field. */
        public static HOUR_OF_DAY0 = new DateFormat.Field(new JavaString("hour of day"), Calendar.HOUR_OF_DAY);
        /**Constant identifying the HOUR_OF_DAY1 field. */
        public static HOUR_OF_DAY1 = new DateFormat.Field(new JavaString("hour of day 1"), -1);
        /**Constant identifying the MILLISECOND field. */
        public static MILLISECOND = new DateFormat.Field(new JavaString("millisecond"), Calendar.MILLISECOND);
        /**Constant identifying the MINUTE field. */
        public static MINUTE = new DateFormat.Field(new JavaString("minute"), Calendar.MINUTE);
        /**Constant identifying the MONTH field. */
        public static MONTH = new DateFormat.Field(new JavaString("month"), Calendar.MONTH);
        /**Constant identifying the SECOND field. */
        public static SECOND = new DateFormat.Field(new JavaString("second"), Calendar.SECOND);
        /**Constant identifying the TIME_ZONE field. */
        public static TIME_ZONE = new DateFormat.Field(new JavaString("time zone"), -1);
        /**Constant identifying the WEEK_OF_MONTH field. */
        public static WEEK_OF_MONTH = new DateFormat.Field(new JavaString("week of month"), Calendar.WEEK_OF_MONTH);
        /**Constant identifying the WEEK_OF_YEAR field. */
        public static WEEK_OF_YEAR = new DateFormat.Field(new JavaString("week of year"), Calendar.WEEK_OF_YEAR);
        /**Constant identifying the YEAR field. */
        public static YEAR = new DateFormat.Field(new JavaString("year"), Calendar.YEAR);

        #calendarField: number;

        public constructor(name: JavaString);
        public constructor(name: JavaString, calendarField: number);
        public constructor(...args: unknown[]) {
            super(args[0] as JavaString);

            this.#calendarField = args.length > 1 ? args[1] as number : -1;
        }
    };
}
