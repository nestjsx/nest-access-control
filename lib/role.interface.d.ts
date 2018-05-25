/**
 *  An interface that defines an access information to be queried.
 */
export interface Role {
    /**
     *  Indicates the resource to be queried.
     */
    resource?: string;
    /**
     *  Defines the type of the operation that is (or not) to be performed on
     *  the resource by the defined role(s).
     *
     *  *possible values*:
     *
     * - `create`: Specifies a CREATE action to be performed on a resource.
     * For example, an HTTP POST request or an INSERT database operation.
     *
     * - `read`: Specifies a READ action to be performed on a resource.
     *  For example, an HTTP GET request or an database SELECT operation.
     *
     * - `update`: Specifies an UPDATE action to be performed on a resource.
     *  For example, an HTTP PUT or POST request or an database UPDATE operation.
     *
     * - `delete`: Specifies a DELETE action to be performed on a resource.
     *  For example, an HTTP DELETE request or a database DELETE operation.
     */
    action?: 'create' | 'read' | 'update' | 'delete';
    /**
     *  Defines the possession of the resource for the specified action.
     *
     *  possible values:
     *
     * - `own`: Indicates that the action is (or not) to be performed on `own`
     *  resource(s) of the current subject.
     *
     * - `any`: Indicates that the action is (or not) to be performed on `any`
     *  resource(s); including `own` resource(s) of the current subject.
     *
     */
    possession?: 'own' | 'any';
}
