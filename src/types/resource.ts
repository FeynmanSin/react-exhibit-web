// --------------资源相关-----------------
export enum ResourceStatus {
  // 全部
  ALL = 0,
  // 新资源
  NEW_RESOURCE = 1,
  // 待审核
  PENDING_REVIEW = 2,
  // 审核中
  UNDER_REVIEW = 3,
  // 已审核
  Approved = 4,
}

export enum HelperTypeEnum {
  TASK = 'TASK',
  ASSET = 'ASSET',
  FEEDBACK = 'FEEDBACK',
}

export interface ResourceViewSetting {
  settings: {
    group?: {
      /** groupFields */
      groupFields?: Array<{   /** field */
        field?: string;
        /** sortOrder */
        sortOrder?: 'ASC' | 'DESC';
      }>;
      /** issueObjectTypeId */
      issueObjectTypeId?: number;
    };
    helperAssetChooseEnum?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5;
    queryItems?: Array<{
      /** column */
      column?: string;

      /** condition */
      condition?: string;

      /** field */
      field?: string;

      /** join */
      join?: 'INNER_JOIN' | 'LEFT_JOIN' | 'RIGHT_JOIN';

      /** joinTableColumn */
      joinTableColumn?: string;

      /** operator */
      operator?:
      | 'AND'
      | 'OR'
      | 'IN'
      | 'NOT_IN'
      | 'LIKE'
      | 'NOT_LIKE'
      | 'EQ'
      | 'NE'
      | 'GT'
      | 'GE'
      | 'LT'
      | 'LE'
      | 'IS_NULL'
      | 'IS_NOT_NULL'
      | 'BETWEEN'
      | 'NOT_BETWEEN'
      | 'ASC'
      | 'DESC'
      | 'CUSTOM';

      /** primaryTableColumn */
      primaryTableColumn?: string;

      /** rawCondition */
      rawCondition?: string;

      /** sortByGbk */
      sortByGbk?: boolean;

      /** userGroup */
      userGroup?: boolean;

      /** value */
      value?: object;
    }>;
    /** subject */
    subject?: string;
  }
}

export interface ResourceGroup {
  // 分组中文
  name: string;
  // 分组英文字段
  groupName: string;
  // 分组下的数据
  count: number;
  // 是否需要懒加载
  isLazy: boolean;
  // 分组下的所有id
  ids: number[];
}

export interface Resource {
  // key/value，包括
  itemMap?: Record<'thumbnailAttachmentId' | 'subject' | 'statusId' | 'startDate' | 'endDate',
    Omit<Resource['item'], 'content' | 'value'> & { content: any; value: string }>;
  item?: {   /** content */
    content?: object;

    /** customFieldId */
    customFieldId?: number;

    /** enableIssueFiledId */
    enableIssueFiledId?: number;

    /** field */
    field?: string;

    /** fieldFormat */
    fieldFormat?: string;

    /** fieldType */
    fieldType?:
    | 'builtIn'
    | 'cf'
    | 'associateAttr'
    | 'apcField'
    | 'upstreamField'
    | 'downstreamField';

    /** isAssociateField */
    isAssociateField?: boolean;

    /** issueId */
    issueId?: number;

    /** issueType */
    issueType?: '-1' | '1' | '2' | '3' | '4' | '5' | -1 | 1 | 2 | 3 | 4 | 5;

    /** label */
    label?: string;

    /** multiple */
    multiple?: boolean;

    /** position */
    position?: number;

    /** readOnly */
    readOnly?: boolean;

    /** required */
    required?: boolean;

    /** unit */
    unit?: string;

    /** value */
    value?: object;
  }[];
  // 额外信息，包括路径，statusId，issueObjectTypeId
  assetObjectVersionId: number;
  extraMap?: {
    assetObjectId: number,
    attachmentId: number,
    createdBy: {
      avatarUrl: string,
      id: number,
      mail: number,
      name: number,
    }
    path: { name: string; id: number }[],
    createdOn: string,
    demandId: number,
    hasComment: boolean,
    issueId: number,
    issueObjectTypeId: number
    sort: string,
    version: number
  },
  id?: number;
  children: [],
  parentId: number,
  isUnread: boolean,
}

export interface ResourceListItem {
  group?: ResourceGroup;
  tasks?: Resource[]
}