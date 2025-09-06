import { BugStatusEnum } from 'src/app/enums/Bugs/BugStatusEnum';
import { BugTypeEnum } from 'src/app/enums/Bugs/BugTypeEnum';

export interface Bugs {
  BID: number;
  BGID: string;
  BUID: number;
  BVerifiers: string;
  BDate: Date;
  BTitle: string;
  BText: string;
  BStatus: BugStatusEnum;
}

export interface Bug {
  BGID: string;
  BTitle: string;
  BText: string;
  BStatus: BugStatusEnum;
}

export interface BugNotes {
  BNGID: string;
  BNDate: Date;
  BNText: string;
  BNIsNewVerifier: boolean;
  BNIsStatusChange: boolean;
  BNChangedStatus: BugStatusEnum;
}

export interface BugFilters {
  BugType: BugTypeEnum;
  Skip: number;
  Take: number;
  Message: string;
}

export interface BugNotesFilters {
  Skip: number;
  Take: number;
}

export enum BugTranslations {
  'BTitle' = 'Bugs_Title',
  'BText' = 'Bugs_Text'
}

export enum BugNoteTranslations {
  'BugNote' = 'Bugs_Bug_AddNoteTitle'
}
