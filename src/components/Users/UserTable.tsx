import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { Table, Thead, Tr, Th, Tbody, Td, Flex, Button, Avatar, Input, Text, Badge } from "@chakra-ui/react"
import { chakra, useColorModeValue } from "@chakra-ui/system"
import { User } from "models/User"
import React, { useEffect } from "react"
import { useTable, usePagination, Column, CellProps, useSortBy } from "react-table"


const UsersTable: React.FC<{
    data: User[];
    fetchData: (pageSize: number, pageIndex: number) => Promise<void>,
    loading: boolean,
    pageCount: number,
    pageSize: number,
    onTerminateTap: (rowIndex: number, user: User) => void,
    updateData: (rowIndex: number, user: User) => void
}> = ({
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    pageSize: controlledPageSize,
    onTerminateTap,
    updateData,
}) => {

        const bgStatus = useColorModeValue("gray.400", "#1a202c");
        const colorStatus = useColorModeValue("white", "gray.400");
        const textColor = useColorModeValue("gray.700", "white");

        const onEditClicked = (rowIdx: number, user: User) => {
            // alert dialog

            // popup alert dialog

            // if confirm,
            // updateData(rowIds, user)
        }

        // react-tables
        // @ts-ignore
        const columns: Column<User>[] = React.useMemo(
            () => [
                {
                    Header: 'Avatar',
                    accessor: 'avatar',
                    sortType: 'basic',
                    Cell: ({ value }: CellProps<User>) => <Avatar src={value} />
                },
                {
                    Header: 'Username',
                    accessor: 'username',
                },
                {
                    Header: 'Role',
                    accessor: 'role',
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                },
                {
                    Header: 'Phone',
                    accessor: 'phone',
                },
                {
                    Header: 'Age',
                    accessor: 'age',
                    isNumeric: true,
                },
                {
                    Header: 'Status',
                    accessor: 'isBanned',
                    Cell: ({ value: isBanned }: CellProps<User>) => {
                        return <Badge
                            bg={isBanned === false ? "green.400" : bgStatus}
                            color={isBanned === false ? "white" : colorStatus}
                            fontSize="16px"
                            p="3px 10px"
                            borderRadius="8px"
                        >
                            {isBanned === false ? 'Active' : 'Terminated'}
                        </Badge>
                    }
                },
                {
                    Header: 'Created At',
                    accessor: 'createdAt',
                },
                {
                    Header: 'Actions',
                    accessor: 'actions',
                },
            ],
            [],
        )

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,
            gotoPage,
            canPreviousPage,
            canNextPage,
            pageCount,
            previousPage,
            nextPage,
            pageOptions,
            state: { pageIndex, pageSize }
        } = useTable<User>(
            {
                columns,
                data,
                initialState: { pageIndex: 0, pageSize: controlledPageSize },
                manualPagination: true,
                pageCount: controlledPageCount,
                updateData,
            },
            useSortBy,
            usePagination,
        )

        useEffect(() => {
            fetchData(pageIndex, pageSize)
        }, [fetchData, pageIndex, pageSize])

        return (
            <Flex flexFlow="column">
                <Table overflowX="scroll" variant="simple" color={textColor} {...getTableProps()}>
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render('Header')}
                                        <chakra.span pl='4'>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <TriangleDownIcon aria-label='sorted descending' />
                                                ) : (
                                                    <TriangleUpIcon aria-label='sorted ascending' />
                                                )
                                            ) : null}
                                        </chakra.span>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} onClick={() => onEditClicked(row.index, row.original)}>
                                    {row.cells.map(cell => {
                                        if (cell.column.id === "actions")
                                            return <Td {...cell.getCellProps()}>
                                                <Button onClick={() => onTerminateTap(row.index, row.original)}>
                                                    {row.original.isBanned ? 'Unban' : 'Terminate'}
                                                </Button>
                                            </Td>

                                        return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    })}
                                </tr>
                            )
                        })}
                        <tr>
                            {loading ? (
                                // Use our custom loading state to show a loading indicator
                                <Td colSpan={10000}>Loading...</Td>
                            ) : (
                                <Td colSpan={10000}>
                                    Showing {page.length} of {controlledPageCount * controlledPageSize}{' '}
                                    results
                                </Td>
                            )}
                        </tr>
                    </Tbody>
                </Table>
                {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
                <Flex className="pagination" alignItems="center">
                    <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </Button>{' '}
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </Button>{' '}
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </Button>{' '}
                    <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </Button>{' '}
                    <chakra.span ml="4">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </chakra.span>
                    <chakra.span>
                        | Go to page:{' '}
                        <Input
                            type="number"
                            defaultValue={pageIndex}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </chakra.span>{' '}
                    {/* <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select> */}
                </Flex>
            </Flex>
        )
    }

export default UsersTable