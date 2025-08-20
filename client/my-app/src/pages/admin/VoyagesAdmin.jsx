import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../components/details/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/Select';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Plane,
  Users,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from 'lucide-react';
import useVoyageBasic from '../../hooks/useVoyageBasic';
import Pagination from '../../components/destination/Pagination';
import axios from 'axios';
const VoyagesAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState([]);
  const { voyages, totale } = useVoyageBasic(page, sort, setLoading);
  const [selectedVoyages, setSelectedVoyages] = useState([]);
  const toggleSelect = (id) => {
    setSelectedVoyages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedVoyages.length === voyages.length) {
      setSelectedVoyages([]);
    } else {
      setSelectedVoyages(voyages.map((v) => v.id));
    }
  };

  const deleteSelectedVoyages = async () => {
    if (selectedVoyages.length === 0) return;
    if (!window.confirm('Supprimer tous les voyages sélectionnés ?')) return;

    try {
      await Promise.all(
        selectedVoyages.map((id) =>
          axios.delete(`http://localhost:5000/api/voyage/${id}`)
        )
      );
      setSelectedVoyages([]);
      setPage(0); // refresh
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-yellow-500 w-60"></span>
      </div>
    );
  }
  if (!voyages) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>No data found</div>
      </div>
    );
  }
  const filteredVoyages = voyages.filter(
    (voyage) =>
      voyage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voyage.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSort = (column) => {
    setSort(([prevColumn, prevDirection]) => {
      if (prevColumn === column) {
        return [column, prevDirection === 'ASC' ? 'DESC' : 'ASC'];
      }
      return [column, 'ASC'];
    });
  };
  const handleDelete = (voyageId) => {
    if (!window.confirm('Are you sure you want to delete this voyage?')) return;

    axios
      .delete(`http://localhost:5000/api/voyage/${voyageId}`)
      .then((res) => {
        console.log('Deleted voyage:', res.data);
        // Option 1: Refetch voyages from backend
        setPage(0); // or trigger useVoyageBasic again
      })
      .catch((err) => console.error(err));
    navigate('.', { replace: true });
  };
  const getStatusColor = (status) => {
    return status === 'valable'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-400  hover:bg-red-500 text-red-800';
  };
  const getTypeColor = (type) => {
    return type === 'voyage_organisé'
      ? 'bg-blue-500  hover:bg-blue-600 text-white'
      : 'bg-orange-500  hover:bg-orange-600  text-white';
  };
  const getFormattedsubTyp = (subType) => {
    switch (subType) {
      case 'voyage_local_simple':
        return 'voyage local simple';
      case 'Voyage_local_simple':
        return 'voyage local simple';

      case 'voyage_local_circuit':
        return 'voyage local circuit';

      case 'voyage_inter':
        return 'Voyage international';

      case 'omra_simple':
        return 'Omra simple';
      case 'omra_voyage':
        return 'Omra voyage';

      case 'hajj':
        return 'Hajj';
      default:
        return subType;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gestion des Voyages
          </h1>
          <p className="text-muted-foreground">Gérez tous vos voyages</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/voyages/create')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Voyage
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div>
          <div>Rechercher et filtrer</div>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 my-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                placeholder="Rechercher par nom ou destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Voyages Table */}
      <div>
        <div className="flex gap-10 items-center my-2">
          <h1 className="my-2">Liste des voyages ({filteredVoyages.length})</h1>
          {selectedVoyages.length > 0 ? (
            <button
              className="btn btn-sm btn-warning"
              onClick={deleteSelectedVoyages}
              disabled={selectedVoyages.length === 0}
            >
              Supprimer les sélectionnés
            </button>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className="rounded-xl border border-b-0 rounded-b-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {/* Checkbox globale */}
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedVoyages.length === voyages.length}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>
                    Voyage
                    <button
                      type="button"
                      onClick={() => handleSort('label')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'label' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>

                  <TableHead>
                    Destination
                    <button
                      type="button"
                      onClick={() => handleSort('destination')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'destination' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    Type
                    <button
                      type="button"
                      onClick={() => handleSort('type')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'type' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    Sous type
                    <button
                      type="button"
                      onClick={() => handleSort('sous_type')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'sous_type' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    Durée
                    <button
                      type="button"
                      onClick={() => handleSort('durée')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'durée' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    Prix
                    <button
                      type="button"
                      onClick={() => handleSort('prix_basique')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'prix_basique' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    Statut
                    <button
                      type="button"
                      onClick={() => handleSort('status')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'status' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    Réservations
                    <button
                      type="button"
                      onClick={() => handleSort('nombreReservations')}
                      className="btn w-8 h-8 px-0 py-0 bg-white border-none hover:bg-gray-50"
                    >
                      {sort[0] === 'nombreReservations' ? (
                        sort[1] === 'ASC' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVoyages.map((voyage) => (
                  <TableRow key={voyage.id}>
                    <TableCell>
                      {' '}
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedVoyages.includes(voyage.id)}
                        onChange={() => toggleSelect(voyage.id)}
                      />
                    </TableCell>

                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <img
                          src={voyage.image}
                          alt={voyage.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span>{voyage.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{voyage.destination}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block w-35 text-center py-2 px-3 rounded-3xl ${getTypeColor(
                          voyage.type
                        )}`}
                      >
                        {voyage.type === 'voyage_organisé'
                          ? 'Voyage Organisé'
                          : 'Omra & Hajj'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getFormattedsubTyp(voyage.sous_type)}
                    </TableCell>
                    <TableCell>{voyage.duration}</TableCell>

                    <TableCell className="font-semibold">
                      {voyage.price}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(voyage.status)}>
                        {voyage.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {voyage.bookings}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* <button className="btn btn-ghost btn-sm">
                          <Eye className="h-4 w-4 text-green-600" />
                        </button>
                          */}
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() =>
                            navigate('/admin/voyages/' + voyage.id)
                          }
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleDelete(voyage.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={page}
            numOfPages={Math.ceil(totale / 5)}
            changePage={(e) => {
              setPage(Number(e.target.value));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VoyagesAdmin;
